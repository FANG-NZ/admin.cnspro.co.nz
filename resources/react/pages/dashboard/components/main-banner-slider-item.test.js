import React from 'react'
import {render} from '@testing-library/react'

import MainBannerSliderItem, {MainBannerSliderEmptyItem} from './main-banner-slider-item'

describe('Main Banner Slider Item', () => {

    test('Renders banner slider empty item', () => {
        render(<MainBannerSliderEmptyItem />)
    })

    test('Renders banner slider item', () => {
        render(<MainBannerSliderItem />)
    })

})