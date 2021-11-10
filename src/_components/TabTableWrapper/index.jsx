import React, { useState } from "react";
// import PropTypes from 'prop-types'
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import { Search, FilterAlt} from "@mui/icons-material";
import "./index.scss";

function TabTableWrapper({ tabNameArr, children, ...rest }) {
  const [selectedItem, setSelectedItem] = useState(0);
  const onClickItem = (index) => {
    return () => setSelectedItem(index);
  };
  return (
    <Box className="TabTableWrapper">
      <Box className="TabTableWrapper__tablabel">
        {tabNameArr.map((item, index) => (
          <Box
            key={index}
            className={`TabTableWrapper__tabItem ${
              selectedItem === index ? "active" : ""
            }`}
            onClick={onClickItem(index)}
          >
            {item.title}
            <span className="TabTableWrapper__tabItemBadge">{item.number}</span>
          </Box>
        ))}
      </Box>
      <Box className="TabTableWrapper__actions">
        <TextField
          label="Số thứ tự, tên, sđt ..."
          id="outlined-start-adornment"
          //   sx={{ margin: '10px 30px',  }}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button sx={{color: '#52575C', textTransform: "none", fontWeight: 400}} endIcon={<FilterAlt sx={{color: "#2E3192"}}/>}>
          Lọc
        </Button>
      </Box>
      <Box className="TabTableWrapper__table">{children(selectedItem)}</Box>
    </Box>
  );
}

TabTableWrapper.propTypes = {};

export default TabTableWrapper;
