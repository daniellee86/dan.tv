import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "09pom85u",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: false,
  token:
    "sk3simJDKZg8rQqTNyb8zlt5mNOfnjkxfXdvqoMfnFauUPbJc9aSVGG6Fcv2jbwTKq7H9IIgOgRmtzCFJ1IHbHcw7AWAuEEFuxncV1oMg6jkr3HGH0oT63qsKgXxNPNhgvf16PT2r1ICGee0lfo9sl6sIXVBp3DK1Xr6556fbaxTf04VPaCT",
  // process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
