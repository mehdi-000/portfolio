export const Experience = () => (
  <div className="bg-zinc-900/50 border-4 border-pink/5 rounded-2xl p-6 md:p-8 shadow-lg text-white">
    <div className="text-xs sm:text-sm text-gray-400 font-heebo uppercase tracking-wide mb-4">
      3 Years of Experience
    </div>
    {[
      {
        title: "Web Developer",
        description:
          "Developing scalable and high-performance web applications with modern technologies.",
        descriptionMobile: "Developing responsive web applications",
        company: "Freelance",
        years: "2024 - Present",
      },
      {
        title: "Founder & Game Developer",
        description:
          "Founded and led Nixx Studios, an independent game studio developing Way of the Warrior, a Visual Novel built in Unity.",
        descriptionMobile: "Founded Nixx Studios working on Way of the Warrior",
        company: "Nixx Studios",
        years: "2024 - Present",
      },
    ].map((job, index) => (
      <div
        key={index}
        className="flex flex-row justify-between items-start text-gray-300 mt-4"
      >
        <div className="flex-1">
          <div className="font-semibold font-pPMonumentExtended text-white text-xs md:text-sm sm:text-base">
            {job.title}
          </div>
          <div className="hidden md:block sm:text-sm text-gray-400 font-heebo">
            {job.description}
          </div>
          <div className="md:hidden text-xs font-heebo text-gray-400 w-3/5 mt-1">
            {job.descriptionMobile}
          </div>
        </div>

        {/* Company & Years Aligned */}
        <div className="min-w-[120px] md:min-w-[150px] text-right text-xs sm:text-sm">
          <div className="font-heebo font-bold text-white">{job.company}</div>
          <span className="text-gray-500 font-heebo">{job.years}</span>
        </div>
      </div>
    ))}

    <div className="border-t border-gray-700 my-6"></div>
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-start font-heebo">
        <span className="text-xs sm:text-base font-pPMonumentExtended text-gray-300">
          Bachelor Informations
          <span className="block md:inline">technologie & Design</span>
        </span>
        <div className="min-w-[120px] md:min-w-[150px] text-right text-xs sm:text-sm">
          <span className="text-white font-bold block">
            Technische Hochschule Lübeck
          </span>
          <span className="text-gray-500">2021 - 2025</span>
        </div>
      </div>
      {[
        {
          title: "Working Student Software Engineer",
          company: "1Komma5°",
          years: "2023 - 2025",
        },
        {
          title: "Student Intern",
          company: "Autonomo Technologies",
          years: "2022 - 2022",
        },
      ].map((job, index) => (
        <div
          key={index}
          className="flex flex-row justify-between items-start font-heebo"
        >
          {/* Strikethrough Effect - Now Crosses Only Text */}
          <span className="relative inline-block text-xs sm:text-sm font-pPMonumentExtended text-gray-500 line-through">
            {job.title}
          </span>

          <div className="min-w-[120px] md:min-w-[150px] text-right text-xs sm:text-sm">
            <span className="text-white block font-bold font-heebo">
              {job.company}
            </span>
            <span className="text-gray-500">{job.years}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
