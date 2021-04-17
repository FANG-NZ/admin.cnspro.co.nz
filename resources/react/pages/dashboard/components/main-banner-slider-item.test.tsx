import React from 'react'
import {render, screen} from '@testing-library/react'

import MainBannerSliderItem, {MainBannerSliderEmptyItem} from './main-banner-slider-item'

describe('Main Banner Slider Item', () => {

    test('Renders banner slider empty item', () => {
        render(<MainBannerSliderEmptyItem />)
    })


    const _item = {
        id: 1,
        url : "https://freebw.com/templates/tatee/images/slide-01.jpg",
        title : "Canadian lake house features dark wood" 
    }

    test('Renders banner slider item', () => {

        render(<MainBannerSliderItem item={_item} />)

        //screen.debug()
        expect(screen.getByText(_item.title)).toBeInTheDocument()
    })

})