// this function scrolls to the top of a table
export const scrollToTop = (name) => {
  const table = document.getElementById(name);
  table.scrollTop = 0;
};
