import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import {Provider} from 'react-redux'
import store from '../store/dashboard-store'
import {useAppDispatch} from '../store/store-hook'
import BannerSliderModal from './banner-slider-modal'
import {show} from '../slice/banner-slider-modal-slice'

//Test render banner slider modal
test('Render banner slider modal', () => {

    //Append portal box
    document.body.innerHTML = "<div id='portal-box'></div>"

    render(
        <Provider store={store}>
            <BannerSliderModal />
        </Provider>
    )

    //const _button = screen.getByRole('button')
    //fireEvent.click(_button)
    screen.debug()

})