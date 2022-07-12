import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Formik} from 'formik';
import EditInventoryForm from './EditInventoryForm';

describe('EditInventoryForm', () => {
  it('renders correctly', () => {
    const {toJSON} = render(
      <EditInventoryForm
        goBack={() => {}}
        formik={Formik}
        headerText="Create Inventory"
        toggleModal={() => {}}
        deleteEntry={() => {}}
        modalVisible={false}
        primaryText="cancel"
        secondaryText="delete"
        modalTitle="Delete Inventory Item"
        modalDescription="Continue to delete inventory item"
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('confirmation pop up is shown when trying to delete an existing item', () => {
    const {container, getByTestId} = render(
      <EditInventoryForm
        goBack={() => {}}
        formik={Formik}
        headerText="Create Inventory"
        toggleModal={() => {}}
        deleteEntry={() => {}}
        modalVisible={false}
        primaryText="cancel"
        secondaryText="delete"
        modalTitle="Delete Inventory Item"
        modalDescription="Continue to delete inventory item"
      />,
    );
    fireEvent.press(getByTestId('deleteTestID'));
    expect(getByTestId('modalTestID')).toHaveProperty('isVisible', true);
  });
});
