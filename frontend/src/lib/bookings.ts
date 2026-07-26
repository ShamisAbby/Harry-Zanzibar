import { api } from "@/lib/api";

export interface BookingStatus {
  reference: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  customerName: string;
  tourTitle: string | null;
  tourSlug: string | null;
  preferredDate: string | null;
  travelersCount: number | null;
  createdAt: string;
}

export async function getBookingByReference(reference: string): Promise<BookingStatus> {
  const { data } = await api.get<{ data: BookingStatus }>(`/v1/bookings/${reference}`);
  return data.data;
}
