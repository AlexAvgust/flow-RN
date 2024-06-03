import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useGetScheduleByDateQuery } from '../api/schedule/schedule';
import { RootState } from '../store/store';

interface DateObjectForGetSchedules {
    startDate: string;
    endDate?: string;
}

const useGetSchedules = (date: DateObjectForGetSchedules, keepCache = false) => {
    const userId = useSelector((state: RootState) => state.user.user?._id) as string;

    const { refetch, isLoading, isSuccess, isFetching } = useGetScheduleByDateQuery(
        { ...date, userId },
        { skip: keepCache }
    );



    return { refetch, isLoading, isSuccess, isFetching };
};


export default useGetSchedules
