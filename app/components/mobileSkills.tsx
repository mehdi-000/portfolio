import { groupedTechIcons } from "@/app/components/usedTechList";

export const MobileSkills = () => {
  return (
    <div className="w-full space-y-10">
      {Object.entries(groupedTechIcons).map(([groupName, groupIcons]) => (
        <div key={groupName} className="space-y-4">
          <h2 className="text-center text-xl font-bold text-white tracking-wide">
            {groupName}
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 place-items-center">
            {Object.entries(groupIcons).map(([name, Icon]) => (
              <div
                key={name}
                className="flex flex-col items-center justify-center text-white transition-transform hover:-translate-y-1 text-center"
              >
                <div className="text-4xl">{Icon}</div>
                <div className="text-xs sm:text-sm font-heebo opacity-80 mt-1">
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
