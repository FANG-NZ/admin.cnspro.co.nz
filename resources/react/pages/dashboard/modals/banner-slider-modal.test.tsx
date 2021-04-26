import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import {Provider} from 'react-redux'
import store from '../store/dashboard-store'
import BannerSliderModal from './banner-slider-modal'
import {show} from '../slice/banner-slider-modal-slice'
import { BannerSliderItem } from '../../../types/banner-slider-item.type'

//Test render banner slider modal with EMPTY
test('Render banner slider modal with EMPTY ITEM', () => {

    //Append portal box
    document.body.innerHTML = "<div id='portal-box'></div>"

    //To open modal
    store.dispatch(show())

    render(
        <Provider store={store}>
            <BannerSliderModal />
        </Provider>
    )

    expect(screen.getByText('Add new item')).toBeInTheDocument()
    expect(screen.getByRole('textbox', {name: 'title'})).toHaveValue('')
    expect(screen.getByTestId('image_status')).toHaveValue('')
})

//Test banner slider item
const item:BannerSliderItem = {
    id: 1,
    title: 'Test title',
    image: {
        id: 11,
        name: 'test.png',
        parent_id: 1,
        url: 'url/test.png'
    }
}

//Test render banner slider modal with VALUE
test('Reander banner slider modal with ITEM', () => {
    //Append portal box
    document.body.innerHTML = "<div id='portal-box'></div>"

    //To open modal
    store.dispatch(show(item))

    render(
        <Provider store={store}>
            <BannerSliderModal />
        </Provider>
    )

    expect(screen.getByText('Update item')).toBeInTheDocument()
    expect(screen.getByRole('textbox', {name: 'title'})).toHaveValue(item.title)
    expect(screen.getByTestId('image_status')).toHaveValue('NOT_CHANGED')
    expect(screen.getByRole('img')).toHaveAttribute('src', item.image.url)
})