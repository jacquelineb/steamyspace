function formatDate(unixTimestamp) {
  console.log(unixTimestamp);
  const date = new Date(unixTimestamp * 1000);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export { formatDate as default };
