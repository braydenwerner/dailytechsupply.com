TODO

1. Query data from and get on frontend
2. Add login functionality, jwt-token authentication
3. Add more valid data, build UI for items

do pagination
will have to pass filters into the getItems query
sample input:
{
	maxPrice: 50,
	pageSize: 25,
	page: 2,
}

when doing sliders/fast input searches on the frontend, do a throttle to only search and update page once slider/other input is done moving
use ssr for rendering the items
