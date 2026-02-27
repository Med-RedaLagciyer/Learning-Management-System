<?php

namespace App\Security;

use App\Entity\User;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserChecker implements UserCheckerInterface
{
    public function checkPreAuth(UserInterface $user): void
    {
        if (!$user instanceof User) {
            return;
        }
        
        if (!$user->isActive()) {
            throw new CustomUserMessageAccountStatusException(
                'Your account is inactive. Please contact the administration.'
            );
        }

        if ($user->isRejected()) {
            throw new CustomUserMessageAccountStatusException(
                'Your account has been rejected. Please contact the administration.'
            );
        }

        if (!$user->isApproved()) {
            throw new CustomUserMessageAccountStatusException(
                'Your account is pending approval.'
            );
        }
    }

    public function checkPostAuth(UserInterface $user): void
    {
        // nothing needed here
    }
}