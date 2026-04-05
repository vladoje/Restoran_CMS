import { useCalendar } from "../_hooks/useCalendar";
import { ModalTd } from "./DateTable";
import Td from "./Td";

function FirstRow({ isSelectDate }: { isSelectDate: boolean | string }) {
  const { prvaSedmica } = useCalendar();
  return (
    <tr className="last:border-b-0">
      {prvaSedmica.map((dan, i) => {
        const args = {
          isSelectDate: !!isSelectDate,
          dan,
          prva: true,
          opens: "working-hours-form",
          k: i + 1,
          data: dan,
        };

        if (!isSelectDate)
          return (
            <Td key={dan || `prazno-${i}`} {...args}>
              {dan}
            </Td>
          );
        return <ModalTd key={dan || `prazno-${i}`} {...args} />;
      })}
    </tr>
  );
}

export default FirstRow;
