import { getAllRSVPs } from "@/lib/db";

export default function RSVPAdminPage() {
  const rsvps = getAllRSVPs();
  const attendingCount = rsvps.filter((row) => row.status === "attending").length;
  const notAttendingCount = rsvps.filter((row) => row.status === "not_attending").length;

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-8 shadow-2xl shadow-zinc-200">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-pink-600">RSVP Recap</p>
            <h1 className="mt-3 text-3xl font-serif text-zinc-950">Summary of RSVP responses</h1>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Live list of RSVP responses stored in the local database.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-pink-200 bg-pink-50 p-5 text-center">
              <p className="text-sm uppercase text-pink-700">Attending</p>
              <p className="mt-3 text-3xl font-semibold text-zinc-950">{attendingCount}</p>
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 text-center">
              <p className="text-sm uppercase text-zinc-500">Not attending</p>
              <p className="mt-3 text-3xl font-semibold text-zinc-950">{notAttendingCount}</p>
            </div>
          </div>
        </div>

        {rsvps.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 p-10 text-center text-zinc-600">
            No RSVP responses yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-zinc-200 bg-white p-4">
            <table className="min-w-full text-left text-sm text-zinc-700">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-900">
                  <th className="px-4 py-3">Guest</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Guests</th>
                  <th className="px-4 py-3">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((row) => (
                  <tr key={row.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                    <td className="px-4 py-4 font-medium text-zinc-900">{row.name}</td>
                    <td className="px-4 py-4 text-sm uppercase tracking-[0.15em] text-zinc-700">
                      {row.status.replace("_", " ")}
                    </td>
                    <td className="px-4 py-4">{row.person}</td>
                    <td className="px-4 py-4 text-zinc-500">{new Date(row.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
