package middleware

import (
	"github.com/clerk/clerk-sdk-go/v2/jwt"
	"github.com/clerk/clerk-sdk-go/v2/user"
	"github.com/gofiber/fiber/v2"
	"log"
	"strings"
)

func WithHeaderAuthorization(ctx *fiber.Ctx) error {
	token := defaultAuthorizationJWTExtractor(ctx)

	if token == "" {
		log.Println("Token is empty")
		return ctx.Next()
	}

	decoded, err := jwt.Decode(ctx.Context(), &jwt.DecodeParams{Token: token})

	if err != nil {
		log.Println("Failed to decode token")
		return ctx.Next()
	}

	log.Printf("Unverified decoded token: %v \n", decoded)
	claims, err := jwt.Verify(ctx.Context(), &jwt.VerifyParams{
		Token: token,
	})

	log.Printf("Claims: %v", claims)

	if err != nil {
		log.Println("Failed to verify claim")
		return ctx.Next()
	}

	log.Println("Claim verified")

	usr, err := user.Get(ctx.Context(), claims.Subject)

	if err != nil || usr == nil {
		log.Println("User not found!")
		return ctx.Next()
	}

	ctx.Locals("user", *usr)
	log.Printf("User Auth Hydrator: User data %v \n", usr)

	return ctx.Next()
}

func RequireHeaderAuthorization(ctx *fiber.Ctx) error {
	user := ctx.Locals("user")
	if user == nil {
		return ctx.SendStatus(fiber.StatusUnauthorized)
	}
	return ctx.Next()

}

func AuthFailureHandler(ctx *fiber.Ctx) error {
	return ctx.SendStatus(fiber.StatusUnauthorized)
}

func defaultAuthorizationJWTExtractor(ctx *fiber.Ctx) string {
	authorization := strings.TrimSpace(ctx.Get("Authorization"))
	return strings.TrimPrefix(authorization, "Bearer ")
}
