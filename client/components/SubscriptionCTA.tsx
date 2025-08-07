const SubscriptionCTA = () => (
  <div className="text-center py-12 border-t border-gray-200 bg-gray-50 rounded-xl px-6">
    <div className="mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Stay updated with our insights
      </h3>
      <p className="text-gray-600 mb-6 font-light">
        Join our newsletter to receive future stories, insights, and
        opportunities directly in your inbox.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-grow px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button className="cursor-pointer bg-gray-900 hover:bg-black text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 whitespace-nowrap">
          Subscribe
        </button>
      </div>
      <p className="mt-4 text-gray-500 text-sm font-light">
        — Get INVERT's perspectives delivered monthly
      </p>
    </div>
  </div>
);

export default SubscriptionCTA;
