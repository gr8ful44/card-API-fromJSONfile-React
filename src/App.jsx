import { useState } from 'react';
import MockData from './MOCK_DATA.json';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function App() {

  // data
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [formats, setFormats] = useState([]);

  // categories-data
  const gender_categories = MockData.map(item => item.gender);
  const allgender = gender_categories.filter((item, index) => {
    return gender_categories.indexOf(item) === index;
  });

  const country_categories = MockData.map(item => item.country);
  const allcountry = country_categories.filter((item, index) => {
    return country_categories.indexOf(item) === index;
  });

  // input-search
  const key_search = ["first_name", "last_name"];
  const search = (data) => {
    return data.filter(item => key_search.some(key => item[key].toLowerCase().includes(query)));
  };

  // cats-btn v2 w/muimimuumumummiimi.
  // --note--:: mui v5 need to import @mui/material/styles instead of @mui/styles in main.jsx.
  const Gender = () => {
    return (
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        size="small"
        color="primary"
      >
        {allgender.map(item => (
          <ToggleButton key={item} onClick={handleClick} value={item} aria-label={item} sx={{
            bgcolor: '#e0e4e7',
            color: '#000',
            border: 'none',
            borderRadius: '0',
            mx: 2,
          }}
            size="small"
          >
            {item}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  };
  const Country = () => {
    return (
      <ToggleButtonGroup
        value={formats}
        onChange={handleFormat}
        aria-label="text formatting"
        size="small"
        color="primary"
      >
        {allcountry.map(item => (
          <ToggleButton key={item} onClick={handleClick} value={item} aria-label={item} sx={{
            bgcolor: '#e0e4e7',
            color: '#000',
            border: 'none',
            borderRadius: '0',
            mx: 2
          }}
            size="small"
          >
            {item}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  };

  // display card
  const DisplayData = ({ data }) => {
    return (
      data.map(item => (<div className="card" key={item.id}>
        <img className='card-img' src={item.image} alt="" />
        <div className="card-info">
          <p className='name'>{item.first_name} {item.last_name}</p>
          <p className='gender'>{item.gender}</p>
          <p className='email'>{item.email}</p>
          <p className='country'>{item.country}</p>
        </div>
      </div>))
    );
  };

  // handler
  const handleClick = (e, newData) => {
    setQuery("");
    const filterdata = MockData.filter(data => data.country === newData || data.gender === newData);
    setData(Array.from(new Set([...data, filterdata])).flat());
  };

  const handleFormat = (e, newFormats) => {
    setFormats(newFormats);
    setQuery("");
  };

  const handleChange = (e) => {
    setFormats([]);
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <h1 className="title">Test</h1>
      <div className="categories-con">
        <div className='categories'>
          <Gender />
        </div>
        <div className='categories'>
          <Country />
        </div>
      </div>
      <form className='search-form'>
        <div className='input-box'>
          <input className='input' type="text" value={query} onChange={handleChange} />
          <label className='label' htmlFor='input'>Search</label>
        </div>
        <button className='search-btn' type="submit">CLEAR</button>
      </form>
      <div className="card-con">
        {formats.length ? <DisplayData data={data} /> : <DisplayData data={search(MockData)} />}
      </div>
    </div>
  );
};

export default App;