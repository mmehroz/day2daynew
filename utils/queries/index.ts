import { gql } from "@apollo/client";

class Queries {
  headerCategories = gql`
    query CategoriesHeader {
      categoriesHeader {
        name
        slug
      }
    }
  `;

  productsByCategory = gql`
    query CategoryProducts($slug: String!) {
      categoryProducts(slug: $slug) {
        name
        MainProducts {
          name
          imageURI
          slug
          selling_price
          discount_price
          short_description
        }
        SubProducts {
          name
          imageURI
          slug
          selling_price
          discount_price
          short_description
        }
        InnerProducts {
          name
          imageURI
          slug
          selling_price
          discount_price
          short_description
        }
      }
    }
  `;

  categoryProducts = gql`
    query CategoryProducts($slug: String!, $take: Int) {
      categoryProducts(slug: $slug) {
        SubProducts(take: $take) {
          discount_price
          imageURI
          name
          short_description
          selling_price
          slug
        }
      }
    }
  `;

  newArrival = gql`
    query NewArrival {
      newArrival {
        discount_price
        imageURI
        name
        short_description
        selling_price
        slug
      }
    }
  `;

  loadMoreMain = gql`
    query LoadMoreMainProducts(
      $slug: String!
      $take: Int
      $lastPSlug: String!
    ) {
      categoryProducts(slug: $slug) {
        LoadMoreMainProducts(take: $take, lastPSlug: $lastPSlug) {
          name
          imageURI
          slug
          selling_price
          discount_price
          short_description
        }
      }
    }
  `;

  loadMoreSub = gql`
    query LoadMoreSubProducts($lastPSlug: String!, $slug: String!, $take: Int) {
      categoryProducts(slug: $slug) {
        LoadMoreSubProducts(lastPSlug: $lastPSlug, take: $take) {
          name
          imageURI
          slug
          selling_price
          discount_price
          short_description
        }
      }
    }
  `;

  loadMoreInner = gql`
    query LoadMoreInnerProducts(
      $lastPSlug: String!
      $slug: String!
      $take: Int
    ) {
      categoryProducts(slug: $slug) {
        LoadMoreInnerProducts(lastPSlug: $lastPSlug, take: $take) {
          name
          imageURI
          slug
          selling_price
          discount_price
          short_description
        }
      }
    }
  `;

  categoryFilters = gql`
    query CategoryFiltersType($slug: String!) {
      categoryFiltersType(slug: $slug) {
        name
        id
      }
    }
  `;

  filtersChild = gql`
    query FiltersType($filtersTypeId: String!) {
      filtersType(id: $filtersTypeId) {
        name
        id
        filters {
          name
          id
        }
      }
    }
  `;
  filterProducts = gql`
    query FilterById(
      $filterByIdId: [String!]!
      $categorySlug: String
      $subCategorySlug: String
      $innerCategorySlug: String
    ) {
      filterById(
        id: $filterByIdId
        category_slug: $categorySlug
        sub_category_slug: $subCategorySlug
        inner_category_slug: $innerCategorySlug
      ) {
        id
        name
        products {
          name
          imageURI
          slug
          selling_price
          discount_price
          short_description
        }
      }
    }
  `;

  categoriesChilds = gql`
    query CategoryProducts($slug: String!, $active: Boolean) {
      categoryProducts(slug: $slug) {
        slug
        child(active: $active) {
          name
          slug
          id
        }
      }
    }
  `;

  fetchBrands = gql`
    query Brands {
      brands {
        name
        slug
        id
      }
    }
  `;

  fetchProduct = gql`
    query Product($slug: String!) {
      product(slug: $slug) {
        slug
        name
        imageURI
        id
        short_description
        additional_info
        code
        discount_price
        galleryImage
        long_description
        brands {
          name
          slug
        }
        inner_category {
          slug
          name
        }
        main_category {
          name
          slug
        }
        selling_price
        quantity
        sku
        sub_category {
          name
          slug
        }
        tags
        variants {
          id
          name
          required
          type
          variants {
            name
            id
            price
            imageURI
            quantity
            sku
          }
        }
      }
    }
  `;

  fetchProductPopup = gql`
    query ProductPopup($slug: String!) {
      productPopup(slug: $slug) {
        id
        discount_price
        name
        imageURI
        short_description
        selling_price
        slug
        quantity
        brands {
          name
          slug
          category {
            slug
          }
        }
        variants {
          id
          name
          required
          type
          variants {
            name
            id
            price
            imageURI
            quantity
          }
        }
      }
    }
  `;

  fetchCategory = gql`
    query Category($slug: String!, $active: Boolean) {
      category(slug: $slug) {
        child(active: $active) {
          name
          slug
          brands {
            name
            slug
          }
          child {
            name
            slug
            brands {
              name
              slug
            }
          }
        }
      }
    }
  `;

  fetchMobileCategory = gql`
    query Category($slug: String!) {
      category(slug: $slug) {
        child {
          name
          slug
        }
      }
    }
  `;

  searchProducts = gql`
    query SearchProducts($name: String!) {
      searchProducts(name: $name) {
        slug
        name
        discount_price
        selling_price
        short_description
        imageURI
      }
    }
  `;

  createUser = gql`
    mutation CreateUser(
      $name: String!
      $email: String!
      $number: String
      $type: AccountType
      $businessId: String
    ) {
      createUser(
        name: $name
        email: $email
        number: $number
        type: $type
        business_id: $businessId
      ) {
        id
      }
    }
  `;

  createAddres = gql`
    mutation CreatedAddress(
      $address: String!
      $label: String!
      $userId: String!
      $lastName: String!
      $firstName: String!
      $number: String
      $postcode: String
      $city: String
    ) {
      createdAddress(
        address: $address
        label: $label
        user_id: $userId
        lastName: $lastName
        firstName: $firstName
        number: $number
        postcode: $postcode
        city: $city
      ) {
        id
      }
    }
  `;

  updateAddress = gql`
    mutation UpdateAddress(
      $addressId: String!
      $address: String
      $city: String
      $postcode: String
      $label: String
      $userId: String
      $firstName: String
      $lastName: String
      $number: String
    ) {
      updateAddress(
        addressId: $addressId
        address: $address
        city: $city
        postcode: $postcode
        label: $label
        user_id: $userId
        firstName: $firstName
        lastName: $lastName
        number: $number
      ) {
        id
      }
    }
  `;

  getAddress = gql`
    query UserAddress($email: String!) {
      userAddress(email: $email) {
        id
      }
    }
  `;

  createOrder = gql`
    mutation CreateOrder(
      $tractionId: String!
      $subtotal: Float!
      $addressId: String!
      $totalPrice: Float!
    ) {
      createOrder(
        traction_id: $tractionId
        subtotal: $subtotal
        address_id: $addressId
        total_price: $totalPrice
      ) {
        id
        order_id
      }
    }
  `;

  createOrderProduct = gql`
    mutation CreateProductOrder(
      $productId: String!
      $purchasedPrice: Float!
      $orderId: String!
      $variantId: [String]
      $quantity: Int
    ) {
      createProductOrder(
        productId: $productId
        purchasedPrice: $purchasedPrice
        order_id: $orderId
        variant_id: $variantId
        quantity: $quantity
      ) {
        id
      }
    }
  `;

  userOrders = gql`
    query UserAddress($email: String!) {
      userAddress(email: $email) {
        address
        orders {
          id
          total_price
          order_id
          order_status
          createdAt
        }
      }
    }
  `;

  userAddress = gql`
    query UserAddress($email: String!) {
      userAddress(email: $email) {
        address
        city
        firstName
        lastName
        postcode
        number
        id
      }
    }
  `;

  valdateUser = gql`
    query IsUserExist($email: String!) {
      isUserExist(email: $email) {
        id
      }
    }
  `;

  createBusinessProfile = gql`
    mutation CreateBusinesProfile(
      $name: String!
      $email: String!
      $phone: String!
      $address: String!
      $country: String!
      $city: String!
      $state: String!
      $doc: String!
      $sellerType: BusinessSellerType!
      $businesType: BusinesType!
    ) {
      createBusinesProfile(
        name: $name
        email: $email
        phone: $phone
        address: $address
        country: $country
        city: $city
        state: $state
        doc: $doc
        sellerType: $sellerType
        businesType: $businesType
      ) {
        id
      }
    }
  `;

  fetchBrandByCat = gql`
    query BrandByCat($slug: String!) {
      brandByCat(slug: $slug) {
        name
        slug
      }
    }
  `;

  fetchFeaturedProducts = gql`
    query FeaturedProducts {
      featuredProducts {
        name
        slug
        selling_price
        discount_price
        imageURI
        short_description
      }
    }
  `;

  fetchBrandProduct = gql`
    query BrandProduct($slug: String!) {
      brandProduct(slug: $slug) {
        name
        slug
        selling_price
        discount_price
        imageURI
        short_description
      }
    }
  `;

  fetchMoreBrandProduct = gql`
    query BrandProductLoadMore(
      $slug: String!
      $brandProductLoadMoreId: String!
    ) {
      brandProductLoadMore(slug: $slug, id: $brandProductLoadMoreId) {
        name
        slug
        selling_price
        discount_price
        imageURI
        short_description
      }
    }
  `;

  sliderImages = gql`
    query SliderImages($type: ImageType!) {
      sliderImages(type: $type) {
        images
      }
    }
  `;

  flashSale = gql`
    query FlashSale {
      flashSale {
        discount_price
        imageURI
        name
        short_description
        selling_price
        slug
      }
    }
  `;

  footerContent = gql`
    query FooterContent($type: FooterType!) {
      footerContent(type: $type) {
        slug
        title
      }
    }
  `;

  createReview = gql`
    mutation CreateReview(
      $review: String!
      $rating: Int!
      $userId: String!
      $productId: String!
    ) {
      createReview(
        review: $review
        rating: $rating
        user_id: $userId
        product_id: $productId
      ) {
        id
      }
    }
  `;

  productReviews = gql`
    query Productreviews($productId: String!) {
      productreviews(productId: $productId) {
        id
        rating
        review
        user {
          name
          email
        }
        createdAt
        updatedAt
      }
    }
  `;

  createAuth = gql`
    mutation CreateAuth($email: String!, $oobCode: String!, $mode: AuthType!) {
      createAuth(email: $email, oobCode: $oobCode, mode: $mode) {
        id
      }
    }
  `;

  isValidCredentials = gql`
    query Query($oobCode: String!) {
      validCredentials(oobCode: $oobCode)
    }
  `;

  fetchSaleProducts = gql`
    query SaleProducts {
      saleProducts {
        discount_price
        imageURI
        name
        short_description
        selling_price
        slug
      }
    }
  `;

  fetchOrderDetails = gql`
    query SingleOrder($singleOrderId: String!) {
      singleOrder(id: $singleOrderId) {
        createdAt
        subtotal
        total_price
        traction_id
        order_status
        order_id
        orderProducts {
          purchasedPrice
          quantity

          variants {
            sku
          }
          product {
            sku
            name
            imageURI
          }
        }
        Address {
          address
          firstName
          lastName
        }
      }
    }
  `;

  createNewsLetter = gql`
    mutation CreateNewsLetter($email: String!) {
      createNewsLetter(email: $email) {
        email
      }
    }
  `;

  toggleUserVerify = gql`
    mutation ToggleUserVerify($email: String!) {
      toggleUserVerify(email: $email) {
        email
      }
    }
  `;
}

export const queries = new Queries();
