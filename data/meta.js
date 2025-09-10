// SPDX-License-Identifier: GPL-3.0-or-later

const getAge = (birthDate) => {
  const yearMs = 3.15576e10;
  return Math.floor((Date.now() - new Date(birthDate).getTime()) / yearMs);
};

export const data = {
  siteName: "amber.vision",
  siteDescription: "My personal web zone",
  authorName: "Amber Cronin",
  authorAge: getAge("1997-01-15"),
  gitURL: "https://github.com/amberstarlight/website",
};
