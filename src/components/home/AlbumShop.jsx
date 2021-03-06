import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, Divider, Typography, Paper } from '@mui/material';
import './AlbumShop.css';
import AlbumCard from '../AlbumCard';
import TrackCard from '../TrackCard';
import { useEffect, useState } from 'react';
import { FilterAccordion } from './FilterAccordion';

function AlbumShop(props) {
    const { savedAlbums, savedAlbumsIds, recommendedAlbums, recommendedTracks, getAlbumRecommendations, getTrackRecommendations, availableGenres, getTrackInfo } = props;

    const [albumsDisplay, setAlbumsDisplay] = useState([]);
    const [using, setUsing] = useState();
    const [selectedIndex, setSelectedIndex] = useState(1);

    const defaultSortCheckboxes = {
        energy: false,
        valence: false,
        danceability: false,
        acousticness: false,
        tempo: false,
        popularity: false,
        duration: false
      }

    // this will execute on component update
    useEffect(() => {
        if (savedAlbums && !using) {
            setAlbumsDisplay(savedAlbums);
        }

        if(recommendedAlbums && using === 'recommended') {
            setAlbumsDisplay(recommendedAlbums)
        }
    }, [savedAlbums, recommendedAlbums]);

    const handleTracks = () => {
        if(selectedIndex === 0) return;

        setUsing('tracks');
        setAlbumsDisplay({ ...[] });
        setSelectedIndex(0);
        getTrackRecommendations("hip-hop", [0,1], [0,1], [0,1], [0,1], [0,250], [0,100], [0,900000], 20, defaultSortCheckboxes);
    }

    const handleSaved = () => {
        if(selectedIndex === 1) return;

        setUsing('saved');
        setAlbumsDisplay({ ...[] });
        setSelectedIndex(1);

        const timer = setTimeout(() => {
            setAlbumsDisplay(savedAlbums);
        }, 20);
        return () => clearTimeout(timer);
    }

    const handleRecommended = () => {
        if(selectedIndex === 2) return;

        setUsing('recommended');
        setAlbumsDisplay({ ...[] });
        setSelectedIndex(2);
        getAlbumRecommendations();

        const timer = setTimeout(() => {
            
        }, 20);
        return () => clearTimeout(timer);
    }


    return (
        <Box sx={{position: 'relative',
            left: '50%',
            transform: 'translate(-50%, 0)',
            width: '1160px',
            height: '90%',
            border: '1px solid black'
            }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                float: 'left',
                width: '250px',
                height: '100%'}}>
                <Typography variant="h4" sx={{fontFamily: 'Garamond', fontWeight: 'bold'}}>Analyzer</Typography>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton selected={selectedIndex === 0} component="a" onClick={handleTracks}>
                            <ListItemText primary="Track Generator" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton selected={selectedIndex === 1} component="a" onClick={handleSaved}>
                            <ListItemText primary="Saved Albums" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton selected={selectedIndex === 2} component="a" onClick={handleRecommended}>
                            <ListItemText primary="Album Recommendation" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Box sx={{float: 'right',
                display: 'flex',
                width: 'calc( 100% - 250px )',
                height: '100%',
                flexDirection: 'column'
                }}>
                <Box sx={{display: 'flex',
                    width: '100%',
                    flexDirection: 'row'}}>
                    <Paper sx={{ height: 40}}></Paper>
                </Box>
                <Box className="AlbumShop-col2-row2" 
                sx={{float: 'right',
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    overflowY: 'scroll'}}>
                    {using === 'tracks' ?
                        <Box sx={{ml: '5px', mr: '5px'}}>
                            <FilterAccordion getTrackRecommendations={getTrackRecommendations} availableGenres={availableGenres}/> 
                    
                            {recommendedTracks ? recommendedTracks.map(track => <TrackCard key={track.id} track={track} getTrackInfo={getTrackInfo} />) : ""}
                        </Box>
                    : <Box sx={{display: 'inline-flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignContent: 'flex-start'}}>
                            {albumsDisplay.length > 0 ? albumsDisplay.map(album => <AlbumCard key={album.id} album={album} savedAlbumsIds={savedAlbumsIds} using={using}/>) : ""}
                        </Box>}
                </Box>
            </Box>
        </Box>
    );
    

}

export default AlbumShop;
