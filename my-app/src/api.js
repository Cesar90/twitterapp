import { TaskQueue } from 'cwait';
import axios from 'axios';

export async function getTwittes(numberOfTwittes) {

    const MAX_SIMULTANEOUS_DOWNLOADS = 3;
    const shortPath = `http://localhost:7890/1.1/statuses/user_timeline.json?count=${numberOfTwittes}&screen_name=`;
    const urls = [shortPath+'versaagency',shortPath+'RainAgency',shortPath+'alexadevs'];
    const queue = new TaskQueue(Promise, MAX_SIMULTANEOUS_DOWNLOADS);
    return await Promise.all(urls.map(queue.wrap(async url => await axios.get(url))));
}