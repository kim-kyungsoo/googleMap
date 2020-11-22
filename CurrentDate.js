export default function CurrentDate () {
 
    var date = new Date();
    var date = new Date().getDate(); //To get the Current Date
    var month = new Date().getMonth() + 1; //To get the Current Month
    var year = new Date().getFullYear(); //To get the Current Year
    var hours = Number(new Date().getHours()); //To get the Current Hours
    
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds(); //To get the Current Seconds
    return  (year+'.'+month+'.'+date+'. '+hours+'시'+min+'분'+sec+'초');
  }