import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '../generic/accordion/Accordion';
import MetadataContext from '../../context/Metadata';
import TranslationContext from '../../context/Translation';

import './ModalContent.scss';

const ModalContent = ({closeModal}) => {

  const metadata = React.useContext(MetadataContext);
  const l10n = React.useContext(TranslationContext);

  return (
    <>
      <div className='dialog-header'>
        <div className='dialog-title'>
          <span>{l10n.contentLicenseTitle}</span>
          <button onClick={closeModal}>{l10n.close}</button>
        </div>
        <div className='dialog-description'>
          {l10n.licenseDialogDescription}
        </div>
      </div>
      <div className='dialog-content'>
        <Accordion>{metadata.licenses.map(license =>
          <div key={license.id} id={license.id} header={license.name}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed id tortor metus. In in ipsum ipsum.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In non sagittis ante.
            Phasellus volutpat dapibus mollis.
            Fusce sed odio non ante venenatis ultrices.
            Maecenas dictum, quam quis sagittis mattis, odio urna tincidunt ipsum, eu congue leo sem lacinia ante.
            Vivamus massa dui, luctus et aliquam sit amet, faucibus vitae nibh. Suspendisse quis dapibus tellus.
            Fusce tempus est rutrum massa mollis venenatis. Aenean quis ante vel lacus facilisis venenatis ut nec nisl.
            Nulla laoreet tincidunt sapien vitae gravida.
          </div>
        )}
        </Accordion>
      </div>
    </>
  );
}

ModalContent.propTypes = {
  closeModal: PropTypes.func.isRequired
};

export default ModalContent;


