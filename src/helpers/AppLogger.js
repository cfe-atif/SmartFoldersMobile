const Applogger = (message = '', data = null) => {
  console.log(
    '%c========= Message =========',
    'color:green; font-weight:bold; font-size:15px',
  );
  console.log('========= ', message, '=========');
  console.log(
    '%c========= With Below Param =========',
    'color:orange; font-weight:bold; font-size:15px',
  );
  console.log(data ? data : 'Data param not found');
  console.log('================================');
};

export default Applogger;
