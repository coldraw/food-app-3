<View style={styles.ratingDetailHub}>
          <View style={styles.ratingHub}>
            <View style={styles.ratingBox}>
              <View style={styles.ratingStarHolder}>
                <Ionicons color={ratingNumberOfStars > 0 ? Colors.lightPrimary : Colors.accentTransparent} size={36} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
              </View>
              <View style={styles.ratingStarHolder}>
                <Ionicons color={ratingNumberOfStars > 1 ? Colors.lightPrimary : Colors.accentTransparent} size={36} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
              </View>
              <View style={styles.ratingStarHolder}>
                <Ionicons color={ratingNumberOfStars > 2 ? Colors.lightPrimary : Colors.accentTransparent} size={36} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
              </View>
              <View style={styles.ratingStarHolder}>
                <Ionicons color={ratingNumberOfStars > 3 ? Colors.lightPrimary : Colors.accentTransparent} size={36} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
              </View>
              <View style={styles.ratingStarHolder}>
                <Ionicons color={ratingNumberOfStars > 4 ? Colors.lightPrimary : Colors.accentTransparent} size={36} name={Platform.OS === 'android' ? 'md-flame' : 'ios-flame'} />
              </View>
            </View>
          </View>
          </View>