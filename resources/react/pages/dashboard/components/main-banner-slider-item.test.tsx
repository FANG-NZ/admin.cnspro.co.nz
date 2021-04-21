import React from 'react'
import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react'
import {Provider} from 'react-redux'
import store from '../store/dashboard-store'
import "regenerator-runtime/runtime";

import MainBannerSliderItem, {MainBannerSliderEmptyItem} from './main-banner-slider-item'
import BannerSliderModal from '../modals/banner-slider-modal'
import ConfirmDialog from '../../../tools/confirm-dialog/confirm-dialog'

const _item = {
    id: 1,
    url : "https://freebw.com/templates/tatee/images/slide-01.jpg",
    title : "Canadian lake house features dark wood" 
}



//Rendering Slider Item/Empty
describe('Slider item rendering', () => {

    //Test rendering empty item
    test('Renders Slider Empty Item', () => {
        render(<MainBannerSliderEmptyItem />)

        expect(screen.getByText(/any SLIDER ITEM added/)).toBeInTheDocument()
    })
    
    //Test rendering slider item
    test('Renders banner slider item', () => {

        render(
            <Provider store={store}>
                <MainBannerSliderItem item={_item} />
            </Provider>
        )
        
        expect(screen.getByText(_item.title)).toBeInTheDocument()
    })

    //Test rendering edit button
    test('Render edit button', () => {
        render(
            <Provider store={store}>
                <MainBannerSliderItem item={_item} />
            </Provider>
        )
        expect(screen.getByRole('button', {name: /edit/i})).toBeInTheDocument()
    })

})

//Banner Slider Item
describe('Slider item actions', () => {

    //Test edit button clicked
    test('Edit button clicked to show item modal', async() => {

        //Append portal box
        document.body.innerHTML = "<div id='portal-box'></div>"

        render(  
            <Provider store={store}>
                <MainBannerSliderItem item={_item} />      

                <BannerSliderModal />   
            </Provider>
        )

        //Test before btn clicked
        let _modal = screen.queryByRole('dialog')
        expect(_modal).toBeNull()

        const _button = screen.getByRole('button', {name: /edit/i})
        fireEvent.click(_button)

        //waitFor and then re-check 
        await waitFor(() => _modal = screen.getByRole('dialog'))
        expect(_modal).toBeInTheDocument()

    })



    //Test delete button clicked
    test('Delete button clicked to show confirm dialog', async() => {

        //Append portal box
        document.body.innerHTML = "<div id='portal-box'></div>"

        render(
            <Provider store={store}>
                <MainBannerSliderItem item={_item} />

                <ConfirmDialog />
            </Provider>
        )

        expect(screen.queryByText(/Are you sure to REMOVE?/i)).toBeNull()

        const _button = screen.getByRole('button', {name: /delete/i})
        fireEvent.click(_button)

        let _text
        await waitFor(() => _text = screen.getByText('Are you sure to REMOVE?'))
        expect(_text).toBeInTheDocument()
    })

})