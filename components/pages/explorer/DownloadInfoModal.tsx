import { css } from '@emotion/react';
import React from 'react';
import { ACKNOWLEDGEMENTS_PATH } from '../../../global/utils/constants';
import StyledLink from '../../Link';
import Loader from '../../Loader';
import { Modal } from '../../Modal';
import defaultTheme from '../../theme';
import { Checkmark, CoronaVirus, File } from '../../theme/icons';

type Props = { onClose: () => void; viralGenomes?: number; fileName?: string; isLoading?: boolean };

const CompleteCheckmark = (
  <div
    css={css`
      display: flex;
      align-items: center;
      padding: 8px;
      background-color: ${defaultTheme.colors.success_dark};
      border-radius: 50%;
    `}
  >
    <Checkmark size={17} fill={defaultTheme.colors.white} />
  </div>
);

const DownloadInfoModal = ({ onClose, viralGenomes, fileName, isLoading = false }: Props) => {
  const DownloadTitle = (
    <div
      css={css`
        display: flex;
        align-items: center;
        column-gap: 10px;
        margin-left: 10px;
        margin-top: 10px;
        color: ${defaultTheme.colors.primary};
        ${defaultTheme.typography.heading}
      `}
    >
      {isLoading ? <Loader size={'20px'} margin={'0px'} /> : CompleteCheckmark}
      {isLoading ? <span>Downloading...</span> : <span>Download Complete</span>}
    </div>
  );
  return (
    <Modal onCloseClick={onClose} title={DownloadTitle}>
      <div
        css={css`
          width: 700px;
          margin: 0px;
          ${defaultTheme.typography.regular}
        `}
      >
        <div
          css={css`
            display: flex;
            margin-top: 20px;
            margin-bottom: 30px;
            align-items: center;
            border: solid 1px #dfdfe1;
            padding: 15px 20px 15px 20px;
            column-gap: 40px;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              column-gap: 10px;
            `}
          >
            <CoronaVirus />
            <span>{viralGenomes} Viral Genomes</span>
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              column-gap: 10px;
            `}
          >
            <File />
            <span> ID: {fileName}</span>
          </div>
        </div>
        <p>
          Your download has started. By downloading this data, you agree to{' '}
          <StyledLink href={ACKNOWLEDGEMENTS_PATH}>acknowledge</StyledLink> the Canadian Public
          Health Laboratory Network (CPHLN), CanCOGeN VirusSeq, all laboratories having contributed
          data and follow all <StyledLink href="./policies">CVDP policies</StyledLink>.
        </p>
        <p>
          Data that is being shared is the work of many individuals and should be treated as
          unpublished data. If you wish to publish research using the data, contact us at{' '}
          <StyledLink
            href="mailto:info@virusseq-dataportal.ca"
            rel="noopener noreferrer"
            target="_blank"
          >
            info@virusseq-dataportal.ca
          </StyledLink>{' '}
          first to ensure that those who have generated the data can be involved in its analysis.
        </p>
      </div>
    </Modal>
  );
};

export default DownloadInfoModal;
