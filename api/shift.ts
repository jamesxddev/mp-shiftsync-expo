import config from '@/config';
import { ShiftAttendanceResponse } from '@/types/shiftAttendance';
import { Response } from '@/types/response';
import api from './client';
import { handleApiError } from '@/lib/handleApiError';

export const timeIn = async (username: string) => {
    try {
        const response = await api.post<Response>(`${config.API_URL}/shift`, {
            username,
        });

        return response.data;
    } catch (error: any) {
        if (handleApiError(error)) {
            return;
        }

        throw new Error(error.response?.data?.message || 'Shift Added Failed!');
    }
};

export const getShiftAttendance = async (username: string) => {
    try {
        const response = await api.get<ShiftAttendanceResponse>(`${config.API_URL}/shift/${username}`, {});
        
        return response.data;
    } catch (error: any) {
        if (handleApiError(error)) {
            return;
        }

        throw new Error(error.response?.data?.message || 'Failed to get shift Attendance!');
    }
};

export const endShift = async (username: string, id: string) => {
    try {
        const response = await api.put<Response>(`${config.API_URL}/shift/${id}`, {
            username,
        });

        return response.data;
    } catch (error: any) {
        if (handleApiError(error)) {
            return;
        }
        
        throw new Error(error.response?.data?.message || 'Shift Update Failed!');
    }
};
