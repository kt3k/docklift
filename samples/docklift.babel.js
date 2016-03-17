import {task} from './'

task('start')
.container({ name: 'my-container', image: 'siomiz/chrome' })
.do(container => container.start())

task('kill')
.container({ name: 'my-container' })
.do(container => container.remove())
