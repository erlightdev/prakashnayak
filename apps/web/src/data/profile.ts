/** Contact details and profiles, from the résumé. One place to update them. */
export const profile = {
  email: "erprakashnayak@gmail.com",
  website: "https://prakashnayak.com.np/",
  linkedin: "https://dub.sh/linkedin-pn",
  researchgate: "https://dub.sh/researchgate",
  phone: "+9779862537264",
  // Not on the résumé — confirm the handle.
  github: "https://github.com/prakashnayak",
} as const;

export const mailto = `mailto:${profile.email}`;

const hireMessage = "Hi Prakash, I'd like to hire you for a project.";
export const whatsapp = `https://wa.me/${profile.phone.replace(/\D/g, "")}?text=${encodeURIComponent(hireMessage)}`;
