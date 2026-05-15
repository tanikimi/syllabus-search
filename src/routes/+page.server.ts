import { GITHUB_PAT } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/tanikimi/syllabus-scraper/refs/heads/main/data.json",
    {
      headers: {
        Authorization: `Bearer ${GITHUB_PAT}`,
        Accept: "application/vnd.github.raw+json",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const jsonData = await res.json();
  return { jsonData };
};
