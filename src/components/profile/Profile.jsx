import React from 'react';
import {useState} from 'react';
import { Typography } from '@mui/material';
import RecentTracks from './RecentTracks';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import TopGenres from './TopGenres';
import CurrentTrack from './CurrentTrack';
import './Profile.css'

function Profile(props) {
    const { profile, artists, tracks, recentTracks, currentTrack, topGenres, getArtists, getTracks, getGenres, getTrackInfo } = props;

    return (
        <div className="Profile">
            <div className="Profile-content">
                <Typography variant="h4" sx={{ textAlign: "center", fontFamily: 'Calibri', fontWeight: 'bold'}}>Profile info for {profile.display_name}</Typography>
                
            </div>
            <div className="Profile-content-2" style={{
                display: 'flow-root',
                flexDirection: 'column',
                paddingLeft: '10px',
                paddingRight: '10px'}}>
                <div style={{float: 'right'}}>
                    <TopGenres genres={topGenres} getGenres={getGenres} />
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <TopArtists artists={artists} getArtists={getArtists} />
                    <TopTracks tracks={tracks} getTracks={getTracks} />
                </div>
                <div style={{marginTop: '20px'}}>
                    {currentTrack ? <CurrentTrack currentTrack={currentTrack} /> : ""}
                    <RecentTracks recentTracks={recentTracks} getTrackInfo={getTrackInfo} />
                </div>
                
            </div>
        </div>
    );
}

export default Profile;