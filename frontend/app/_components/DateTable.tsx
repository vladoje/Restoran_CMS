"use client";

import Modal from "./Modal";

import { WorkingHoursForm } from "./WorkingHoursForm";
import { SelectedDate } from "./SelectedDate";

import FirstRow from "./FirstRow";
import OtherRows from "./OtherRows";
import { CalendarProvider, daysOfWeek2 } from "../_context/CalendarContext";
import { useModal } from "../_hooks/useModal";
import Td from "./Td";

import { SlobodanDan } from "../_lib/Interfaces";

function DateTable({
  specialDates,
  restoranId,
}: {
  specialDates: SlobodanDan[];
  restoranId: number;
}) {
  const isSelectDate = "admin";
  return (
    <div className="mb-6">
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 block px-1">
        Specifični dani / Praznici
      </label>
      <CalendarProvider>
        <div className="py-4">
          <SelectedDate />
          <Modal>
            <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <table className="min-w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {Object.values(daysOfWeek2).map(
                      (dan: string, i: number) => (
                        <th
                          className="py-3 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-center border-r last:border-r-0 border-gray-200"
                          key={`dan-${i}`}
                        >
                          {dan.slice(0, 3)}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  <FirstRow isSelectDate={isSelectDate} />
                  <OtherRows isSelectDate={isSelectDate} />
                </tbody>
              </table>
            </div>

            <Modal.Window name="working-hours-form">
              <WorkingHoursForm
                restoranId={restoranId}
                isSelectDate={isSelectDate}
                specialDates={specialDates}
              />
            </Modal.Window>
          </Modal>
        </div>{" "}
      </CalendarProvider>
    </div>
  );
}
export default DateTable;

export function CloseButton() {
  const { close } = useModal();
  return (
    <button
      onClick={close}
      className="flex-1 px-4 py-3 text-sm font-bold text-gray-500 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
    >
      Odustani
    </button>
  );
}
export function ModalTd({
  ...args
}: {
  isSelectDate: boolean;
  opens: string;
  dan: number;
  k: number;
  data: number;
}) {
  const { open } = useModal();
  return (
    <Td open={open} {...args}>
      {args.data}
    </Td>
  );
}
