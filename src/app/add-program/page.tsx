"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddProgramPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: "",
    link: "",
    image: "",
    alternativesTo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-6 text-gray-400">You must be signed in to add a program.</p>
        <button
          onClick={() => signIn("google")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    );
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/programs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create program");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Add New Program</h1>
          <p className="mt-2 text-gray-400">Share a new open source program with the community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-xl border border-gray-700">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Program Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              required
              placeholder="e.g. developer-tools, graphics, utility"
              value={formData.tags}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-300">
              Website Link
            </label>
            <input
              type="url"
              name="link"
              id="link"
              required
              placeholder="https://..."
              value={formData.link}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              id="image"
              required
              placeholder="https://..."
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="alternativesTo" className="block text-sm font-medium text-gray-300">
              Alternatives To (comma separated)
            </label>
            <input
              type="text"
              name="alternativesTo"
              id="alternativesTo"
              placeholder="e.g. Photoshop, Microsoft Word"
              value={formData.alternativesTo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Submitting..." : "Submit Program"}
          </button>
        </form>
      </div>
    </div>
  );
}
