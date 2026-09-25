import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Meta } from "../components/Meta";
import { getCommonPageProps } from "../utils/getPageProps";

export default function FatalityTracker({ fatalities }) {
  const year = 2026;

  const formatCrashDate = (date) => {
    const [yearPart, month, day] = date.split("-");
    const formatted = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(
      new Date(
        Date.UTC(
          Number(yearPart),
          Number(month) - 1,
          Number(day),
        ),
      ),
    );

    return formatted;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Meta
        title="Portland Traffic Fatality Tracker"
        description="A person-centered record of people killed in transportation crashes on Portland streets and transportation facilities."
      />

      <main className="flex-1 bg-white">
        <div className="max-w-6xl mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Portland Traffic Fatality Tracker
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Families for Safe Streets PDX maintains this tracker as a
            person-centered record of people killed in transportation crashes
            on Portland streets and transportation facilities.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-2xl font-bold text-gray-900">
              {fatalities.length} people have been killed on Portland streets
              so far in {year}.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Preliminary data
            </p>
          </div>

          <div className="overflow-x-auto mb-10">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th
                    scope="col"
                    className="text-left py-3 px-3 font-semibold text-gray-900"
                  >
                    Crash Date
                  </th>
                  <th
                    scope="col"
                    className="text-left py-3 px-3 font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="text-left py-3 px-3 font-semibold text-gray-900"
                  >
                    Age
                  </th>
                  <th
                    scope="col"
                    className="text-left py-3 px-3 font-semibold text-gray-900"
                  >
                    Travel Mode
                  </th>
                  <th
                    scope="col"
                    className="text-left py-3 px-3 font-semibold text-gray-900"
                  >
                    Location
                  </th>
                  <th
                    scope="col"
                    className="text-left py-3 px-3 font-semibold text-gray-900"
                  >
                    District
                  </th>
                  <th
                    scope="col"
                    className="text-left py-3 px-3 font-semibold text-gray-900"
                  >
                    Light Conditions
                  </th>
                </tr>
              </thead>

              <tbody>
                {fatalities.map((fatality) => (
                  <tr
                    key={fatality.slug}
                    className="border-b border-gray-200"
                  >
                    <td className="text-left py-3 px-3 whitespace-nowrap">
                      {formatCrashDate(fatality.date)}
                    </td>
                    <td className="text-left py-3 px-3">
                      {fatality.name}
                    </td>
                    <td className="text-center py-3 px-3">
                      {fatality.age}
                    </td>
                    <td className="text-left py-3 px-3">
                      {fatality.travelMode}
                    </td>
                    <td className="text-left py-3 px-3">
                      {fatality.location}
                    </td>
                    <td className="text-center py-3 px-3">
                      {fatality.district}
                    </td>
                    <td className="text-left py-3 px-3">
                      {fatality.lightConditions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About our data
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Families for Safe Streets PDX tracks people who die as a result
              of transportation crashes on Portland streets and transportation
              facilities. This includes crashes involving motor vehicles,
              motorcycles, bicycles, pedestrians, buses, and rail transit, as
              well as single-vehicle and single-bicycle crashes. We do not
              include deaths caused solely by medical events or other causes
              unrelated to a crash.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Our totals may differ from official government traffic-fatality
              statistics because government agencies use specific reporting
              definitions that may exclude some deaths included in the
              Families for Safe Streets PDX tracker.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const fatalitiesDirectory = path.join(
    process.cwd(),
    "content",
    "fatalities",
  );

  const filenames = fs.readdirSync(fatalitiesDirectory);

  const fatalities = filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(fatalitiesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        name: String(data.name || ""),
        age: String(data.age || ""),
        date: String(data.date || ""),
        travelMode: String(data.travelMode || ""),
        location: String(data.location || ""),
        district: String(data.district || ""),
        lightConditions: String(data.lightConditions || ""),
        slug: filename.replace(".md", ""),
      };
    })
    .filter((fatality) => fatality.date.startsWith("2026-"))
    .sort((a, b) => b.date.localeCompare(a.date));

  const commonProps = await getCommonPageProps();

  return {
    props: {
      fatalities,
      ...commonProps,
    },
  };
}
