export type Shift = {
    shiftId: string;
    timeIn: string;
    timeOut: string;
  };
  
  export type ShiftAttendanceResponse = {
    presentToday: boolean;
    shiftEnded : boolean;
    shiftId : string
    shifts: Shift[];
  };