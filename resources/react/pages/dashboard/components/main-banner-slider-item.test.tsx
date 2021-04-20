import React from 'react'
import {cleanup, render, screen, fireEvent, waitFor, waitForElement} from '@testing-library/react'
import {Provider} from 'react-redux'
import store from '../store/dashboard-store'
import BannerSliderModal from '../modals/banner-slider-modal'
import "regenerator-runtime/runtime";

import MainBannerSliderItem, {MainBannerSliderEmptyItem} from './main-banner-slider-item'

const _item = {
    id: 1,
    url : "https://freebw.com/templates/tatee/images/slide-01.jpg",
    title : "Canadian lake house features dark wood" 
}

afterEach(cleanup)

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
        expect(screen.getByRole('button', {name: 'edit'})).toBeInTheDocument()
    })

})

//Banner Slider Item
describe('Slider item actions', () => {

    //Test edit button clicked
    test('Edit button clicked to show item modal', async() => {
        render(
            <>
                <Provider store={store}>
                    <MainBannerSliderItem item={_item} />      

                    <BannerSliderModal />   
                </Provider>

                <div id="portal-box"></div>
            </>
        )

        const _container = document.body
        const _button = screen.getByRole('button', {name: /edit/i})
        fireEvent.click(_button)

        
        //screen.debug()

        await waitFor(() => {
            //_container.querySelector('#main-banner-slider-modal')
            const _modal = _container.querySelector('#main-banner-slider-modal')
            console.log(_modal)
        })

    })

    //Test delete button clicked
    // test('Delete button clicked to show confirm dialog', () => {
    //     render(
    //         <Provider store={store}>
    //             <MainBannerSliderItem item={_item} />
    //         </Provider>
    //     )

    //     const _button = screen.getByRole('button', {name: 'delete'})
    //     //fireEvent.click(_button)

    //     // waitFor(() => {
    //     //     expect(screen.getByText('RE')).toBeInTheDocument()
    //     // })
    // })

})