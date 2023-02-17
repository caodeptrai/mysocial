import React, { useContext, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { AuthContext } from '../../contexts/AuthContext';
import './Search.scss';
import { AutoComplete, Avatar, Spin } from 'antd';
import { debounce } from 'lodash';
import { AppContext } from '../../contexts/AppContext';

function DebounceSearch({ fetchOptions, debounceTimeout = 300, ...props }) {
    // Search: abcddassdfasdf

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions]);

    React.useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    return (
        <AutoComplete
            className="custom"
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {options?.map((opt) => (
                <AutoComplete.Option key={opt.uid} value={opt.displayName} title={opt.displayName} user={opt}>
                    <Avatar size="small" src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.displayName}`}
                </AutoComplete.Option>
            ))}
        </AutoComplete>
    );
}

const Search = () => {
    const [value, setValue] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { setOpenProfile, setUserInfo, setOpenProfileOwner } = useContext(AppContext);

    const handleSelect = async (value, option) => {
        setValue('');
        setUserInfo(option.user);
        setOpenProfile(false);
        setOpenProfileOwner(true);
    };

    async function fetchUserList(search) {
        const q = query(collection(db, 'users'), where('keywords', 'array-contains', search));
        const querySnapshot = await getDocs(q);

        const data = [];
        let res = {};
        querySnapshot.forEach((doc) => {
            res = {
                ...doc.data(),
            };
            data.push(res);
        });
        return data.filter((item) => item.uid !== currentUser.uid);
    }

    return (
        <DebounceSearch
            placeholder="Nhập từ khóa tìm kiếm..."
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            onSelect={handleSelect}
            value={value}
            allowClear={true}
            className="custom"
        ></DebounceSearch>
    );
};

export default Search;
