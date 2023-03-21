export const Applogger = (message, data) => {
  console.log(
    '%c========= Message =========',
    'color:green; font-weight:bold; font-size:15px',
  );
  console.log('========= ', message, '=========');
  console.log(
    '%c========= With Below Param =========',
    'color:orange; font-weight:bold; font-size:15px',
  );
  console.log(data !== undefined ? data : 'Data param not found');
  console.log('================================');
};

export default Applogger;
