import React, { useEffect, useState } from 'react';
import {useSearchParams } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import DataTable from '@/components/DataTable';
import Pagination from '@/components/Pagination';
import jsonData from '@/api/data.json';
import { User } from "@/interface/User";
import { RawUserData } from "@/interface/RawUserData";
import '@/App.css';

const UserManagementView: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage] = useState<number>(20);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<string>('asc');


    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const page = parseInt(searchParams.get('page') || '1', 10);
        const search = searchParams.get('search') || '';
        const sortCol = searchParams.get('sortColumn') || '';
        const sortDir = searchParams.get('sortDirection') || 'asc';

        setCurrentPage(page);
        setSearchTerm(search);
        setSortColumn(sortCol);
        setSortDirection(sortDir);
    }, [searchParams]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (currentPage !== 1) params.set('page', currentPage.toString());
        if (sortColumn) params.set('sortColumn', sortColumn);
        if (sortDirection !== 'asc') params.set('sortDirection', sortDirection);

        setSearchParams(params);
    }, [searchTerm, currentPage, sortColumn, sortDirection, setSearchParams]);

    const fetchData = () => {
        setTimeout(() => {
            if (jsonData && jsonData.results) {
                const formattedUsers = jsonData.results.map((rawUser: RawUserData) => ({
                    picture: rawUser.picture.medium,
                    name: `${rawUser.name.title} ${rawUser.name.first} ${rawUser.name.last}`,
                    gender: rawUser.gender,
                    location: rawUser.location.country,
                    dob: rawUser.dob,
                    email: rawUser.email,
                    phone: rawUser.phone,
                }));
                setUsers(formattedUsers);
            } else {
                console.error('Ошибка загрузки данных');
            }
        }, 1500);
    };

    const formatDateOfBirth = (date: string): string => {
        const dobDate = new Date(date);
        return `${dobDate.getDate()}.${dobDate.getMonth() + 1}.${dobDate.getFullYear()}`;
    };

    const handleSort = (column: string) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const filteredUsers = users.filter(user => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return Object.values(user).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(searchTermLowerCase)
        );
    });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        let aValue: string | Date | undefined;
        let bValue: string | Date | undefined;

        if (sortColumn === 'dob') {
            aValue = new Date(a.dob.date);
            bValue = new Date(b.dob.date);
        } else {
            aValue = a[sortColumn as keyof User] as string | undefined;
            bValue = b[sortColumn as keyof User] as string | undefined;
        }

        if (aValue === undefined) aValue = '';
        if (bValue === undefined) bValue = '';

        if (sortDirection === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
            return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
        }
    });

    const displayedUsers = sortedUsers.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <div className="table-container">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <DataTable
                users={displayedUsers}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                formatDateOfBirth={formatDateOfBirth}
                onSort={handleSort}
            />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredUsers.length / perPage)}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default UserManagementView;
