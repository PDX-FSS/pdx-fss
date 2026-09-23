import { useState } from "react";

export default function StopSuperSpeedersEndorsementForm() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok) throw new Error("Submission failed");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      name="stop-super-speeders-endorsement"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-6 mt-8"
    >
      <input
        type="hidden"
        name="form-name"
        value="stop-super-speeders-endorsement"
      />

      <div>
        <label className="block font-semibold mb-1" htmlFor="organization-name">
          Organization name *
        </label>
        <input
          id="organization-name"
          name="organization-name"
          type="text"
          required
          className="w-full border border-gray-400 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="organization-website">
          Organization website
        </label>
        <input
          id="organization-website"
          name="organization-website"
          type="url"
          className="w-full border border-gray-400 rounded px-3 py-2"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="first-name">
            First name *
          </label>
          <input
            id="first-name"
            name="first-name"
            type="text"
            required
            className="w-full border border-gray-400 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="last-name">
            Last name *
          </label>
          <input
            id="last-name"
            name="last-name"
            type="text"
            required
            className="w-full border border-gray-400 rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="title-role">
          Title or role with organization *
        </label>
        <input
          id="title-role"
          name="title-role"
          type="text"
          required
          className="w-full border border-gray-400 rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="email">
          Email address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-gray-400 rounded px-3 py-2"
        />
        <p className="text-sm mt-1">
          Your email address will not be displayed publicly.
        </p>
      </div>

      <div className="space-y-4">
        <label className="flex gap-3 items-start">
          <input
            type="checkbox"
            name="authorized-representative"
            required
            className="mt-1"
          />
          <span>
            I am authorized to endorse Stop Super Speeders Oregon on behalf of
            this organization. *
          </span>
        </label>

        <label className="flex gap-3 items-start">
          <input
            type="checkbox"
            name="endorses-statement"
            required
            className="mt-1"
          />
          <span>Our organization endorses the statement above. *</span>
        </label>

        <label className="flex gap-3 items-start">
          <input
            type="checkbox"
            name="public-listing-permission"
            required
            className="mt-1"
          />
          <span>
            I give Families for Safe Streets PDX permission to publicly list
            our organization as an endorser of Stop Super Speeders Oregon. *
          </span>
        </label>
      </div>

      <div>
        <label className="block font-semibold mb-1" htmlFor="comments">
          Comments (optional)
        </label>
        <textarea
          id="comments"
          name="comments"
          rows="5"
          className="w-full border border-gray-400 rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-black text-white font-semibold px-6 py-3 rounded disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Submit Endorsement"}
      </button>

      {status === "success" && (
        <p className="font-semibold">
          Thank you. Your organization&apos;s endorsement has been submitted for
          review. Families for Safe Streets PDX may contact you if we need to
          confirm any information.
        </p>
      )}

      {status === "error" && (
        <p className="font-semibold">
          We weren&apos;t able to submit your endorsement. Please try again.
        </p>
      )}
    </form>
  );
}
