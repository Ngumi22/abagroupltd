"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireDashboardUser } from "@/lib/auth/require-dashboard-user";

const GOOGLE_REVIEW_MIN_RATING = 4;

interface GooglePlaceReview {
  name: string;
  rating: number;
  text?: { text: string; languageCode: string };
  originalText?: { text: string; languageCode: string };
  authorAttribution?: {
    displayName: string;
    uri?: string;
    photoUri?: string;
  };
  publishTime: string;
}

function revalidateTestimonialCaches() {
  revalidateTag("testimonials", "max");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export type SyncResult =
  | { status: "success"; created: number; updated: number; total: number }
  | { status: "error"; message: string };

export async function syncGoogleReviews(): Promise<SyncResult> {
  await requireDashboardUser();

  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId || !apiKey) {
    return { status: "error", message: "Google Places is not configured." };
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "reviews",
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Google Places API responded with ${response.status}`);
    }

    const data: { reviews?: GooglePlaceReview[] } = await response.json();
    const reviews = data.reviews ?? [];
    const qualifyingReviews = reviews.filter(
      (review) => review.rating >= GOOGLE_REVIEW_MIN_RATING,
    );

    let created = 0;
    let updated = 0;

    for (const review of qualifyingReviews) {
      const quote = review.originalText?.text ?? review.text?.text ?? "";
      const name = review.authorAttribution?.displayName ?? "Google user";

      const result = await prisma.testimonial.upsert({
        where: { externalId: review.name },
        update: { quote, rating: review.rating, name },
        create: {
          externalId: review.name,
          name,
          quote,
          rating: review.rating,
          source: "Google",
          reviewedAt: new Date(review.publishTime),
        },
      });

      if (result.createdAt.getTime() === result.updatedAt.getTime()) {
        created += 1;
      } else {
        updated += 1;
      }
    }

    revalidateTestimonialCaches();

    return {
      status: "success",
      created,
      updated,
      total: qualifyingReviews.length,
    };
  } catch (error) {
    console.error("Failed to sync Google reviews:", error);
    return {
      status: "error",
      message: "Failed to sync reviews from Google.",
    };
  }
}

export async function createTestimonial(data: {
  name: string;
  quote: string;
  rating: number;
  role?: string;
  project?: string;
  featured?: boolean;
}) {
  await requireDashboardUser();

  await prisma.testimonial.create({
    data: { ...data, source: "Manual", reviewedAt: new Date() },
  });

  revalidateTestimonialCaches();
}

export async function updateTestimonial(
  id: string,
  data: {
    name?: string;
    quote?: string;
    rating?: number;
    role?: string;
    project?: string;
    featured?: boolean;
  },
) {
  await requireDashboardUser();

  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (!existing) throw new Error("Testimonial not found.");

  const payload =
    existing.source === "Manual"
      ? data
      : {
          role: data.role,
          project: data.project,
          featured: data.featured,
        };

  await prisma.testimonial.update({ where: { id }, data: payload });

  revalidateTestimonialCaches();
}

export async function deleteTestimonial(id: string) {
  await requireDashboardUser();

  await prisma.testimonial.delete({ where: { id } });

  revalidateTestimonialCaches();
}
