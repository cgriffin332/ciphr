// React
import { useState, useEffect, useContext } from "react";
// Material UI
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
// File Modules
import API from "../../utils/API";
import AuthContext from "../../context/AuthContext/AuthContext";
import HomeSection from "../../components/HomeSection/HomeSection";
import SearchBar from "../../components/SearchBar/SearchBar";

// Styling for Specific Components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const AllAlgorithms = () => {
  const classes = useStyles();
  const { username } = useContext(AuthContext);

  const [allAlgorithms, setAllAlgorithms] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllAlgorithms();
  }, []);

  const filterAlgorithms = () => {
    return allAlgorithms.filter((algorithm) => {
      // return algorithm.challengeName
      //   .toLowerCase()
      //   .startsWith(search.toLowerCase());
     const banana = algorithm.hashtags.filter((hashtag)=> hashtag.toLowerCase().startsWith(`#${search.toLowerCase()}`));
     console.log(banana);
     return banana;
    });
  };

  const getAllAlgorithms = () => {
    API.getAllAlgorithms()
      .then((algorithms) => {
        setAllAlgorithms(algorithms.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* Welcome Message */}
          <Box p={3}>
            <Typography variant="h3" component="h3" align="center">
              Welcome {username}!
            </Typography>
          </Box>
        </Grid>
        <HomeSection
          size={12}
          title="All Algorithms"
          algorithms={filterAlgorithms()}
        >
          <SearchBar search={search} handleSearch={handleSearch} />
        </HomeSection>
      </Grid>
    </div>
  );
};

export default AllAlgorithms;
