import { getAnalyticsClient } from "@/lib/analytics/ga-client";

export interface WebsiteVisitsSummary {
  visits: number;
  trendLabel: string;
}

export async function getWebsiteVisits(
  days = 30,
): Promise<WebsiteVisitsSummary> {
  const propertyId = process.env.GA_PROPERTY_ID;
  if (!propertyId) {
    return { visits: 0, trendLabel: "Analytics not connected" };
  }

  try {
    const client = getAnalyticsClient();
    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
      metrics: [{ name: "activeUsers" }],
    });

    const visits = Number(response.rows?.[0]?.metricValues?.[0]?.value ?? 0);
    return { visits, trendLabel: `Last ${days} days` };
  } catch (error) {
    console.error("[Analytics] Failed to fetch GA4 report:", error);
    return { visits: 0, trendLabel: "Analytics unavailable" };
  }
}
