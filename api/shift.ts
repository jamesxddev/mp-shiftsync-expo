import axios from 'axios';
import config from '../config';
import { ShiftAttendanceResponse } from '../types/shiftAttendance';
import { Response } from '../types/response';

export const timeIn = async (username: string) => {
    try {
        const response = await axios.post<Response>(`${config.API_URL}/shift`, {
            username,
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Shift Added Failed!');
    }
};

export const getShiftAttendance = async (username: string) => {
    try {
        const response = await axios.get<ShiftAttendanceResponse>(`${config.API_URL}/shift/${username}`, {});
        console.log(response, 'response Types')

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to get shift Attendance!');
    }
};

export const endShift = async (username: string, id: string) => {
    try {
        const response = await axios.put<Response>(`${config.API_URL}/shift/${id}`, {
            username,
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Shift Update Failed!');
    }
};
