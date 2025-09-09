// SPDX-License-Identifier: GPL-3.0-or-later

const getAge = (birthDate) => {
  const yearMs = 3.15576e10;
  return Math.floor((Date.now() - new Date(birthDate).getTime()) / yearMs);
};

export const siteName = "amber.vision";
export const siteDescription = "My personal web zone";
export const authorName = "Amber Cronin";
export const authorAge = getAge("1997-01-15");
export const gitURL = "https://github.com/amberstarlight/website";
