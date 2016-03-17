import {task} from './'

task('start-my-container').container({
  name: 'my-container',
  image: 'siomiz/chrome'
})(container => container.start())

task('kill-my-container').container({
  name: 'my-container'
})(container => container.remove())
