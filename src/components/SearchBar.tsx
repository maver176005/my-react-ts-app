import React from 'react';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    const [showNotification, setShowNotification] = React.useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => setShowNotification(true)}
                onBlur={() => setShowNotification(false)}
                placeholder="Поиск..."
                className="search-input"
            />
            <button onClick={() => setSearchTerm(searchTerm)} className="search-button">
                Искать
            </button>
            {showNotification && (
                <div className="notification">
                    <p>Поиск по запросу "{searchTerm}"</p>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
