/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  openPreferences,
  startAccessibleSketch,
  startSketch,
  stopSketch
} from '../../actions/ide';
import {
  setAutorefresh,
  setGridOutput,
  setTextOutput
} from '../../actions/preferences';

import PlayIcon from '../../../../images/play.svg';
import StopIcon from '../../../../images/stop.svg';
import PreferencesIcon from '../../../../images/preferences.svg';
import ProjectName from './ProjectName';
import NFTMintModal from '../NFTMintModal';

const Toolbar = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { isPlaying, infiniteLoop, preferencesIsVisible } = useSelector(
    (state) => state.ide
  );
  const project = useSelector((state) => state.project);
  const autorefresh = useSelector((state) => state.preferences.autorefresh);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const playButtonClass = classNames({
    'toolbar__play-button': true,
    'toolbar__play-button--selected': isPlaying
  });
  const stopButtonClass = classNames({
    'toolbar__stop-button': true,
    'toolbar__stop-button--selected': !isPlaying
  });
  const preferencesButtonClass = classNames({
    'toolbar__preferences-button': true,
    'toolbar__preferences-button--selected': preferencesIsVisible
  });

  return (
    <div className="toolbar">
      <button
        className="toolbar__play-sketch-button"
        onClick={() => {
          props.syncFileContent();
          dispatch(startAccessibleSketch());
          dispatch(setTextOutput(true));
          dispatch(setGridOutput(true));
        }}
        aria-label={t('Toolbar.PlaySketchARIA')}
        disabled={infiniteLoop}
      >
        <PlayIcon focusable="false" aria-hidden="true" />
      </button>
      <button
        className={playButtonClass}
        id="play-sketch"
        onClick={() => {
          props.syncFileContent();
          dispatch(startSketch());
        }}
        aria-label={t('Toolbar.PlayOnlyVisualSketchARIA')}
        title={t('Toolbar.PlaySketchARIA')}
        disabled={infiniteLoop}
      >
        <PlayIcon focusable="false" aria-hidden="true" />
      </button>
      <button
        className={stopButtonClass}
        onClick={() => dispatch(stopSketch())}
        aria-label={t('Toolbar.StopSketchARIA')}
        title={t('Toolbar.StopSketchARIA')}
      >
        <StopIcon focusable="false" aria-hidden="true" />
      </button>
      <div className="toolbar__autorefresh">
        <input
          id="autorefresh"
          className="checkbox__autorefresh"
          type="checkbox"
          checked={autorefresh}
          onChange={(event) => {
            dispatch(setAutorefresh(event.target.checked));
            if (event.target.checked) {
              dispatch(startSketch());
            }
          }}
        />
        <label htmlFor="autorefresh" className="toolbar__autorefresh-label">
          {t('Toolbar.Auto-refresh')}
        </label>
      </div>
      <div className="toolbar__project-name-container">
        <ProjectName />
        {(() => {
          if (project.owner) {
            return (
              <p className="toolbar__project-project.owner">
                {t('Toolbar.By')}{' '}
                <Link to={`/${project.owner.username}/sketches`}>
                  {project.owner.username}
                </Link>
              </p>
            );
          }
          return null;
        })()}
      </div>

      {/* Mint Button */}
      <button
        className="toolbar__mint-button"
        aria-label={t('Toolbar.MintNFT')}
        onClick={() => {
          props.syncFileContent();
          dispatch(startSketch());
          openModal();
        }}
        title={t('Toolbar.MintNFT')}
      >
        {t('Toolbar.MintNFT')}
      </button>
      <NFTMintModal isOpen={isModalOpen} onClose={closeModal} />
      <button
        className={preferencesButtonClass}
        onClick={() => dispatch(openPreferences())}
        aria-label={t('Toolbar.OpenPreferencesARIA')}
        title={t('Toolbar.OpenPreferencesARIA')}
      >
        <PreferencesIcon focusable="false" aria-hidden="true" />
      </button>
    </div>
  );
};

Toolbar.propTypes = {
  syncFileContent: PropTypes.func.isRequired
};

export default Toolbar;
