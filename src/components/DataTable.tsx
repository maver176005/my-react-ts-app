import React from 'react';
import { User } from '@/interface/User';
import styles from './DataTable.module.css';
interface DataTableProps {
    users: User[];
    sortColumn: string;
    sortDirection: string;
    formatDateOfBirth: (date: string) => string;
    onSort: (column: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({ users, formatDateOfBirth, onSort }) => {
    const columns = [
        { key: 'picture', label: 'Аватар' },
        { key: 'name', label: 'ФИО' },
        { key: 'gender', label: 'Пол' },
        { key: 'location', label: 'Страна' },
        { key: 'dob', label: 'Дата рождения' },
        { key: 'email', label: 'Адрес электронной почты' },
        { key: 'phone', label: 'Телефон' },
    ];

    const renderCell = (user: User, key: keyof User) => {
        if (key === 'dob') {
            return formatDateOfBirth(user.dob.date);
        } else if (key === 'picture') {
            return <img src={user.picture} alt="Аватар" />;
        } else {
            return user[key];
        }
    };

    return (
        <table className={styles.table}>
            <thead>
            <tr>
                {columns.map(column => (
                    <th key={column.key} onClick={() => onSort(column.key)} className={styles.th}>
                        {column.label}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                    {columns.map(column => (
                        <td key={column.key} className={styles.td}>
                            {renderCell(user, column.key as keyof User)}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default DataTable;
