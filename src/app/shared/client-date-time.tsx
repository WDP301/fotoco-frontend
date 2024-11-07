'use client';
import { getDateFormatted } from '@/lib/utils';
export default function ClientDatetime({ datetime }: { datetime: string }) {
  return getDateFormatted(datetime);
}
